variable "name" {
  type        = string
  description = "Name of this CDN profile"
}

variable "resource_group_name" {
  type        = string
  description = "Resource group to establish CDN profile in"
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply to the CDN profile"
}
