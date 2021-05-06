variable "config" {
  type        = map(any)
  description = "The config to use for provisioning."
}

variable "environment" {
  type        = string
  default     = ""
  description = "The environment to provision the resoource in."
}