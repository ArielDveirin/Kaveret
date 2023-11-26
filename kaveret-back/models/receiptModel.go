package models

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Receipt struct {
	gorm.Model
	Username   string
	Total      float32
	ItemIdList pq.Int64Array `gorm:"type:integer[]"`
}
