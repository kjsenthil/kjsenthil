variable "environment_prefix" {
  type        = string
  description = "description"
}

variable "enable_static_website" {
  type    = bool
  default = true
}

variable "enable_storybook" {
  type    = bool
  default = true
}

variable "projections_function_app_code_path" {
  type    = string
  default = "./zips/projections.zip"
}
