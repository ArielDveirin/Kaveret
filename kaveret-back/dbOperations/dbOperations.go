package dbOperations

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"kaveretBack/initializers"
	"kaveretBack/models"
	"log"
	"strconv"

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

	newItem := models.Item{Name: body.Name, Quantity: body.Quantity, Price: body.Price, ImageUrl: body.ImageUrl}

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
	result := initializers.DB.Model(&body).Where("id = ?", body.ID).Updates(models.Item{Name: body.Name, Quantity: body.Quantity, Price: body.Price, ImageUrl: body.ImageUrl})
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

type BoughtItem struct {
	Id       int
	Quantity int
	Username string
}

type cart struct {
	CartItems []BoughtItem
}

func BuyItems(c *gin.Context) {
	jsonData, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		log.Fatal(err)
	}

	var cartItems cart

	parseErr := json.Unmarshal((jsonData), &cartItems)
	var body models.Item

	for i, s := range cartItems.CartItems {
		result := initializers.DB.Where("id = ?", s.Id).First(&body)
		var recipt models.Receipt

		if result.Error != nil {
			fmt.Println(result.Error)
			fmt.Printf("\n\nID:%d QUANTITY:%d USERNAME: %s\n\n", s.Id, s.Quantity, s.Username)

			c.JSON(http.StatusBadRequest, gin.H{
				"message": "ITEM COULD NOT BE UPDATED",
			})
			return
		}

		inStockQuantity, err := strconv.Atoi(body.Quantity)

		if inStockQuantity < s.Quantity || err != nil {
			fmt.Println("Item not in stock: ", i, "currently in stock: ", s.Id)
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "NOT ENOUGH IN STOCK",
			})
			return
		} else {
			//if there's enough in the stock, we substract the neeeded amount

			//the item added to the reciept
			recipt.ItemList = append(recipt.ItemList, body)

			if totalAsFloat, err := strconv.ParseFloat(body.Price, 32); err == nil {
				recipt.Total = recipt.Total + float32(totalAsFloat)
			}

			recipt.Username = s.Username

			fmt.Printf("\n\n******************\nReciept Item added -> Id: %d, Price: %s, Quantity: %d\n", body.ID, body.Price, s.Quantity)
		}

		result = initializers.DB.Create(&recipt)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "Error adding reciept to DB",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Reciept was Created succesfuly!",
		})

	}

	//fmt.Printf(string(jsonData) + "\n")

	fmt.Println(cartItems)

	if parseErr != nil {

		// if error is not nil
		// print error
		log.Fatal(parseErr)
	}
}
