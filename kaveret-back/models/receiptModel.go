package models

import "gorm.io/gorm"

type Receipt struct {
	gorm.Model
	Username      string
	Total         float32
	AmountInStock int
}
