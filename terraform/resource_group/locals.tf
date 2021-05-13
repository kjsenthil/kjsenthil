locals {
  location_map = {
    uksouth = "uks"
    ukwest  = "ukw"
  }
  short_location = lookup(local.location_map, lower(replace(var.location, "/\\s/", "")))

  is_development_env = !(var.environment_prefix == "staging" || var.environment_prefix == "preprod" || var.environment_prefix == "prod")

  default_tags = {
    "CostCode"            = "934"
    "Department"          = "Financial Services"
    "Project"             = "Digital Hybrid"
    "Owner"               = "owner_placeholder"
    "Terraform"           = "true"
    "Environment"         = var.environment_prefix
    "main_directory_path" = "./terraform/resource_group"
  }
}
