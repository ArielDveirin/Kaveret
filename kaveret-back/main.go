package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"

	"kaveretBack/initializers"
	"kaveretBack/models"

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

	jsonData, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		fmt.Println(err)
	}

	var user models.User

	parseErr := json.Unmarshal(jsonData, &user)

	if parseErr != nil {

		// if error is not nil
		// print error
		fmt.Println(parseErr)
	}

	fmt.Printf("Username: %s\nPassword: %s\nEmail: %s\n", user.Username, user.Password, user.Email)

	c.JSON(200, gin.H{
		string(jsonData): "Hello!",
	})

}

func main() {
	r := gin.Default()
	r.POST("", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})

	})
	r.POST("/post", postRegisterDetails)
	r.Run() // listen and serve on 0.0.0.0:8080
}
