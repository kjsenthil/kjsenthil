variable "enable_static_website" {
  type    = bool
  default = true
}

variable "projections_function_app_code_path" {
  type    = string
  default = "./zips/projections.zip"
}

variable "cors_allowed_origins" {
  type    = list(string)
  default = ["http://localhost:8000"]
}