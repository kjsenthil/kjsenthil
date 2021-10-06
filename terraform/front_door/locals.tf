locals {
  front_door_name      = "fd-gbl-${var.environment_prefix}-dh"
  custom_frontend_name = "preview"
  default_tags = {
    "CostCode"            = "934"
    "Department"          = "Financial Services"
    "Project"             = "Digital Hybrid"
    "Owner"               = "owner_placeholder"
    "terraform"           = "true"
    "environment"         = var.environment_prefix
    "main_directory_path" = "./terraform/front_door"
  }
}
