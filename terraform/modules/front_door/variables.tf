variable "backends" {
  type = list(object({
    address = string,
    enabled = bool
  }))
  description = "Backends for the Front Door"
}

variable "cache_enabled" {
  type        = bool
  description = "Whether to enable caching on the forwarding rule"
  default     = false
}

variable "custom_frontend" {
  type = object({
    name      = string,
    host_name = string
  })
  description = "Optional custom frontend for the Front Door"
  default     = null
}

variable "health_check_interval" {
  type        = number
  description = "Backend health check interval (in seconds)"
  default     = 120
}

variable "health_check_method" {
  type        = string
  description = "HTTP method to use for the health check probe. Can be GET or HEAD"
  default     = "HEAD"
}

variable "health_check_protocol" {
  type        = string
  description = "Protocol to use for backend health checks (Http or Https)"
  default     = "Https"
}

variable "health_check_sample_size" {
  type        = number
  description = "Number of samples to consider for health check decisions"
  default     = 4
}

variable "health_check_success_samples" {
  type        = number
  description = "Number of health checks in a sample that must succeed for the backend to be considered healthy"
  default     = 2
}

variable "name" {
  type        = string
  description = "Name of the Front Door to create"
}

variable "resource_group" {
  type        = string
  description = "Resource group to deploy the Front Door into"
}

variable "tags" {
  type        = map(string)
  description = "Tags for the resource"
  default     = {}
}
