package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"

	"github.com/gin-gonic/gin"
)

type RegisterUser struct {
	Username string
	Password string
	Email    string
}

func postRegisterDetails(c *gin.Context) {
	jsonData, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		// Handle error
	}

	c.JSON(200, gin.H{
		string(jsonData): "Hello!",
	})
	var user RegisterUser

	parseErr := json.Unmarshal(jsonData, &user)

	if parseErr != nil {

		// if error is not nil
		// print error
		fmt.Println(parseErr)
	}

	fmt.Printf("Username: %s\nPassword: %s\nEmail: %s\n", user.Username, user.Password, user.Email)

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
