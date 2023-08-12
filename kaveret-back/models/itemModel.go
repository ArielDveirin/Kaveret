package models

import "gorm.io/gorm"

type Item struct {
	gorm.Model
	itemName      string
	price         float32
	itemID        string
	amountInStock int
}
