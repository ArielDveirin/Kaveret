package models

import "gorm.io/gorm"

type Item struct {
	gorm.Model
	Name     string `json:"name" gorm:"unique"`
	Price    string
	Quantity string
	ImageUrl string
}
