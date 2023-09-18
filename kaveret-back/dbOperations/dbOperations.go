package dbOperations

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"kaveretBack/initializers"
	"kaveretBack/models"
	"log"

	"net/http"

	"github.com/gin-gonic/gin"
)

func AddItem(c *gin.Context) {
	jsonData, err := io.ReadAll(c.Request.Body)
	if err != nil {
		log.Fatal(err)
	}

	var body models.Item

	parseErr := json.Unmarshal(jsonData, &body)

	if parseErr != nil {

		// if error is not nil
		// print error
		log.Fatal(parseErr)
	}
	var item models.Item

	initializers.DB.First(&item, "name = ?", body.Name)

	if item.ID != 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "this Item aready exists",
		})
		return
	}

	newItem := models.Item{Name: body.Name, Quantity: body.Quantity, Price: body.Price}

	result := initializers.DB.Create(&newItem)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "ITEM COULD NOT BE CREATED",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "ITEM CREATED",
	})

}

func GetItems(c *gin.Context) {
	var items []models.Item
	initializers.DB.Find(&items)

	c.JSON(http.StatusOK, gin.H{
		"items": items,
	})
}

func GetUsers(c *gin.Context) {
	var users []models.User
	initializers.DB.Find(&users)

	c.JSON(http.StatusOK, gin.H{
		"items": users,
	})
}

func EditItem(c *gin.Context) {
	jsonData, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		log.Fatal(err)
	}

	var body models.Item

	parseErr := json.Unmarshal(jsonData, &body)

	if parseErr != nil {

		// if error is not nil
		// print error
		log.Fatal(parseErr)
	}

	fmt.Printf("id: %d , name: %s", body.ID, body.Name)

	//result := initializers.DB.Save(&newItem)
	result := initializers.DB.Model(&body).Where("id = ?", body.ID).Updates(models.Item{Name: body.Name, Quantity: body.Quantity, Price: body.Price})
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "ITEM COULD NOT BE UPDATED",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "ITEM UPDATED",
	})

}

func DeleteItem(c *gin.Context) {
	jsonData, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		log.Fatal(err)
	}

	var body models.Item

	parseErr := json.Unmarshal(jsonData, &body)
	fmt.Printf("id: %d , name: %s", body.ID, body.Name)
	if parseErr != nil {

		// if error is not nil
		// print error
		log.Fatal(parseErr)
	}

	//result := initializers.DB.Save(&newItem)
	result := initializers.DB.Unscoped().Where(&body).Delete(&body)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "ITEM COULD NOT BE UPDATED",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "ITEM UPDATED",
	})

}
