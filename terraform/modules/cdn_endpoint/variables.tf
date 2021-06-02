variable "name" {
  type        = string
  description = "Name to assign to this endpoint"
}

variable "resource_group_name" {
  type        = string
  description = "Name of the resource group to create this endpoint in"
}

variable "cdn_profile_name" {
  type        = string
  description = "Name of the CDN profile to create this endpoint in"
}

variable "origin_hostname" {
  type        = string
  description = "Name of the origin resource to use as the target of this endpoint"
}

variable "origin_name" {
  type        = string
  description = "Name to use for the origin (target) of this endpoint"
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply to the endpoint"
}

variable "csp_allowed_script_sources" {
  type = string
  description = "Any allowed 'script-src' directives to be added to the CSP header"
  default = "'self'"
}

variable "csp_allowed_style_sources" {
  type = string
  description = "Any allowed 'style-src' directives to be added to the CSP header"
  default = "'self'"
}
