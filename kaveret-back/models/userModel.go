package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username   string
	Password   string
	Email      string
	Id         int
	Permission string
}
