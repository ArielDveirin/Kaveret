package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"kaveretBack/initializers"
	"kaveretBack/models"
	"log"

	"github.com/gin-gonic/gin"

	"github.com/google/uuid"
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

	u := uuid.New()

	fmt.Printf("Username: %s\nPassword: %s\nEmail: %s\nUid: %s\n", user.Username, user.Password, user.Email, u.String())

	if err != nil {
		log.Fatal(err)
	}
	finalUserData := models.User{Username: user.Username, Email: user.Email, Password: user.Password, Id: u.String(), Permission: "User"}

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

func CheckUser(c *gin.Context) {

	jsonData, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		log.Fatal(err)
	}

	var user models.User
	var returnedUser models.User

	parseErr := json.Unmarshal(jsonData, &user)

	if parseErr != nil {

		// if error is not nil
		// print error
		log.Fatal(parseErr)
	}

	fmt.Printf("Username: %s\nPassword: %s\n", user.Username, user.Password)

	if err != nil {
		log.Fatal(err)
	}

	initializers.DB.Where("Username = ?", user.Username).First(&returnedUser)
	// SELECT * FROM users WHERE username = username given;

	if returnedUser.Password == user.Password {
		fmt.Println("User found")

		r := gin.Default()
		r.POST("", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "User Found",
			})

		})
	} else {
		fmt.Println("User NOT found")

		r := gin.Default()
		r.POST("", func(c *gin.Context) {
			c.JSON(404, gin.H{
				"message": "User Not Found",
			})

		})
	}

}
