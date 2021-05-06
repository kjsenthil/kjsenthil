locals {
  environment = "dev1"
  apim_name   = "digital-hybrid"
  rg_name     = "digital-hybrid-backend"
  location    = "West Europe"
  apima_name  = "digital-hybrid-api"
  path        = "digitalhybrid"
  default_tags = {
    "Cost Code"   = "cost_code_placeholder"
    "Department"  = "FS"
    "Project"     = "Digital-Hybrid"
    "Owner"       = "owner_placeholder"
    "terraform"   = "true"
    "environment" = local.environment
  }
}
