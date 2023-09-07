package dbOperations

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"kaveretBack/initializers"
	"kaveretBack/models"
	"log"

	"net/http"

	"github.com/gin-gonic/gin"
)

func AddItem(c *gin.Context) {
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
	fmt.Println("Item Name: " + body.Name)
	var item models.Item

	initializers.DB.First(&item, "name = ?", body.Name)

	if item.ID != 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "this Item aready exists",
		})
		return
	}

	//hash the password

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
