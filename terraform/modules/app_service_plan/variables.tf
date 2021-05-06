variable "name" {
  type        = string
  description = "The name of the App Service Plan."
}

variable "resource_group_name" {
  type        = string
  description = "The resource group to deploy the App Service Plan."
}

variable "location" {
  type        = string
  description = "The location to deploy the App Service Plan."
}

variable "kind" {
  type        = string
  description = "The kind of App Service Plan to deploy."
}

variable "tier" {
  type        = string
  description = "The tier for the App Service Plan."
}

variable "size" {
  type        = string
  description = "The size of the App Service Plan."
}

variable "reserved" {
  type        = bool
  description = "Whether this ASP should be reserved"
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "Non default tags for the resource."
}
