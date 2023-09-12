package models

import "gorm.io/gorm"

type Item struct {
	gorm.Model
	ItemId   int
	Name     string `json:"name" gorm:"unique"`
	Price    string
	Quantity string
}
