package main

import (
	"fmt"
	"kaveretBack/controllers"
	"kaveretBack/dbOperations"
	"kaveretBack/initializers"
	"kaveretBack/middleware"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type RegisterUser struct {
	Username string
	Password string
	Email    string
}

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func postRegisterDetails(c *gin.Context) {
	controllers.Signup(c)
}

func postLoginDetails(c *gin.Context) {

	controllers.Login(c)
}

func checkAdmin(c *gin.Context) {

	check := middleware.IsAdmin(c)

	if check {
		c.JSON(http.StatusOK, gin.H{
			"message": "User IS ADMIN",
		})
		fmt.Println("User IS ADMIN")

	} else {
		c.JSON(http.StatusForbidden, gin.H{
			"message": "User IS NOT ADMIN",
		})
		fmt.Println("User IS NOT ADMIN")
	}
}

func LogoutAction(c *gin.Context) {

	controllers.Logout(c)
}

func postAddItem(c *gin.Context) {
	dbOperations.AddItem(c)
}

func postEditItem(c *gin.Context) {
	dbOperations.EditItem(c)
}

func postDeleteItem(c *gin.Context) {
	dbOperations.DeleteItem(c)
}

func getItems(c *gin.Context) {
	dbOperations.GetItems(c)
}

func getUsers(c *gin.Context) {
	dbOperations.GetUsers(c)
}

func buyItems(c *gin.Context) {
	dbOperations.BuyItems(c)
}

func getReceipts(c *gin.Context) {
	dbOperations.GetReceipts(c)
}

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // Add more origins if needed
		AllowMethods:     []string{"POST", "GET"},
		AllowCredentials: true,
	}))

	r.POST("/register", postRegisterDetails)
	r.POST("/login", postLoginDetails)
	r.GET("/logout", LogoutAction)

	r.GET("/validate", middleware.RequireAuth, controllers.Validate)
	r.GET("/isAdmin", checkAdmin)

	r.POST("/addItem", checkAdmin, postAddItem)
	r.POST("/deleteItem", checkAdmin, postDeleteItem)
	r.POST("/EditItem", checkAdmin, postEditItem)

	r.GET("/getItems", getItems)
	r.GET("/getReceipts", getReceipts)

	r.GET("/getUsers", middleware.RequireAuth, getUsers)

	r.POST("/deleteUser", checkAdmin, middleware.RequireAuth, controllers.DeleteUser)
	r.POST("/EditUser", checkAdmin, middleware.RequireAuth, controllers.EditUser)

	r.POST("/BuyItems", buyItems)

	r.Run() // listen and serve on 0.0.0.0:8080
}
