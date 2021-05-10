locals {
  location_map = {
    uksouth = "uks"
    ukwest  = "ukw"
  }
  short_location = lookup(local.location_map, lower(replace(var.location, "/\\s/", "")))

  default_tags = {
    "Cost Code"           = "934"
    "Department"          = "Financial Services"
    "Project"             = "Digital Hybrid"
    "Owner"               = "owner_placeholder"
    "terraform"           = "true"
    "main_directory_path" = "./terraform/init"
  }
}
