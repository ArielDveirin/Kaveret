package main

import (
	"fmt"
	"io/ioutil"

	"github.com/gin-gonic/gin"
)

func postRegisterDetails(c *gin.Context) {
	jsonData, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		// Handle error
	}

	c.JSON(200, gin.H{
		string(jsonData): "Hello!",
	})

	fmt.Println("got username: ", string(jsonData))

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
