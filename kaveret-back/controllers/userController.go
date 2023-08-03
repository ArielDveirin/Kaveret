package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"kaveretBack/initializers"
	"kaveretBack/models"
	"log"

	"github.com/gin-gonic/gin"
)

func UserCreate(c *gin.Context) {

	jsonData, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		log.Fatal(err)
	}

	var user models.User

	parseErr := json.Unmarshal(jsonData, &user)

	if parseErr != nil {

		// if error is not nil
		// print error
		log.Fatal(parseErr)
	}

	fmt.Printf("Username: %s\nPassword: %s\nEmail: %s\n", user.Username, user.Password, user.Email)

	//id := shortuuid.New()
	finalUserData := models.User{Username: user.Username, Email: user.Email, Password: user.Password, Id: "2", Permission: "User"}

	result := initializers.DB.Create(&finalUserData) // pass pointer of data to Create

	if result.Error != nil {
		c.Status(400)
		return
	}

	r := gin.Default()
	r.POST("", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "User Created",
		})

	})
	r.Run() // listen and serve on 0.0.0.0:8080
}
