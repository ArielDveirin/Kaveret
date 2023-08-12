package main

import (
	"kaveretBack/controllers"
	"kaveretBack/initializers"

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

	controllers.UserCreate(c)

	c.JSON(200, gin.H{
		"jsonData": "Hello!",
	})

}

func postLoginDetails(c *gin.Context) {
	controllers.CheckUser(c)

	c.JSON(200, gin.H{
		"jsonData": "Hello!",
	})
}

func main() {
	r := gin.Default()
	r.POST("", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})

	})
	r.POST("/register", postRegisterDetails)
	r.POST("/login", postLoginDetails)

	r.Run() // listen and serve on 0.0.0.0:8080
}
