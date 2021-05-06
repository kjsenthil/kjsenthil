locals {
  location_map = {
    uksouth = "uks"
    ukwest  = "ukw"
  }
  short_location = lookup(local.location_map, lower(replace(var.location, "/\\s/", "")))

  endpoints = jsonencode(zipmap(values(module.api_operation).*.operation_id, formatlist("%s%s", format("%s/%s", data.azurerm_api_management.apim.gateway_url, module.apima.path), values(module.api_operation).*.url_template)))
  api_definitions = {
    for k, v in
    tomap(jsondecode(file(format("%s/%s", path.module, "api_definitions.json"))))["api_definitions"] :
    v["operation_id"] => v
  }

  default_tags = {
    "Cost Code"           = "934"
    "Department"          = "Financial Services"
    "Project"             = "Digital Hybrid"
    "Owner"               = "owner_placeholder"
    "terraform"           = "true"
    "main_directory_path" = "./terraform/infra"
    "env_prefix"          = var.environment_prefix
  }
}
