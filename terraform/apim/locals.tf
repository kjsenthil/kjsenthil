locals {
  location_map = {
    uksouth = "uks"
    ukwest  = "ukw"
  }

  log_retention = {
    dev     = 30
    staging = 30
    prod    = 365 # Revisit when producion log retention requirements are ready!
  }

  short_location = lookup(local.location_map, lower(replace(var.location, "/\\s/", "")))

  default_tags = {
    "CostCode"            = "934"
    "Department"          = "Financial Services"
    "Project"             = "Digital Hybrid"
    "Owner"               = "owner_placeholder"
    "terraform"           = "true"
    "environment"         = var.environment_prefix
    "main_directory_path" = "./terraform/apim"
  }

}
