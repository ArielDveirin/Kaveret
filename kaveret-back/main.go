package main

import (
	"kaveretBack/controllers"
	"kaveretBack/initializers"
	"kaveretBack/middleware"

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

func main() {
	r := gin.Default()
	r.POST("", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})

	})
	r.POST("/register", postRegisterDetails)
	r.POST("/login", postLoginDetails)
	r.GET("/validate", middleware.RequireAuth, controllers.Validate)

	r.Run() // listen and serve on 0.0.0.0:8080
}
