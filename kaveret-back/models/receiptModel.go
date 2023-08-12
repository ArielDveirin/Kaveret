package models

import "gorm.io/gorm"

type Receipt struct {
	gorm.Model
	receiptID     string
	username      string
	total         float32
	amountInStock int
}
