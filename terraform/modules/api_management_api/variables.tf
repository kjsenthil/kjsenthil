variable "environment_prefix" {
  type        = string
  description = "The environment name based on the PR."
}

variable "name" {
  type        = string
  default     = "digital-hybrid-api"
  description = "description"
}


variable "resource_group_name" {
  type        = string
  default     = "digital-hybrid-backend"
  description = "Resource group name to deploy this api in."
}

variable "revision" {
  type        = number
  default     = 1
  description = "The API revision."
}

variable "display_name" {
  type        = string
  default     = "digital-hybrid-API"
  description = "The display name of the API."
}

variable "path" {
  type        = string
  default     = "digitalhybrid"
  description = "The path for the API."
}

variable "protocols" {
  type        = list(string)
  default     = ["https"]
  description = "The suppported protocols by the API."
}

variable "subscription_required" {
  type    = bool
  default = false
}

variable "description" {
  type        = string
  default     = "digital hybrid api"
  description = "The description for the deployed API."
}

variable "api_management_name" {
  type        = string
  default     = "digital-hybrid"
  description = "API management name"
}