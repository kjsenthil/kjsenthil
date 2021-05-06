variable "tags" {
  type        = map(string)
  default     = {}
  description = "Non default tags for the resource."
}

variable "environment_prefix" {
  type        = string
  description = "The environment to deploy this resource."
}

variable "app_name" {
  type        = string
  default     = "digital-hybrid"
  description = "The name of the application."
}

variable "location" {
  type        = string
  description = "Azure location to deploy resources into. Must be either 'uksouth' or 'ukwest'"
}
