package models

import "gorm.io/gorm"

type Item struct {
	gorm.Model
	Name     string
	Price    string
	Quantity string
	ImageUrl string
	IsOnSale string
	Category string
}
