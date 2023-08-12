package main

import (
	"kaveretBack/initializers"
	"kaveretBack/models"
)

func init() {

	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	initializers.DB.AutoMigrate(&models.User{})
	initializers.DB.AutoMigrate(&models.Item{})
	initializers.DB.AutoMigrate(&models.Receipt{})

}
