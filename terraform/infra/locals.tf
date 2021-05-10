locals {
  location_map = {
    uksouth = "uks"
    ukwest  = "ukw"
  }
  short_location = lookup(local.location_map, lower(replace(var.location, "/\\s/", "")))

  endpoints = jsonencode(zipmap(values(module.api_operation).*.operation_id, formatlist("%s%s", "${data.azurerm_api_management.apim.gateway_url}/${module.apima.path}", values(module.api_operation).*.url_template)))
  api_definitions = {
    for k, v in
    tomap(jsondecode(file("${path.module}/api_definitions.json")))["api_definitions"] :
    v["operation_id"] => v
  }

  api_backends = {
    bestinvest_api           = "https://online.bestinvest.co.uk/api/"
    bestinvest_auth          = "https://identityapi.demo2.bestinvest.co.uk/api/"
    xplan                    = "https://tbigroupuat2.xplan.iress.co.uk/"
    projections_function_app = "https://${module.function_app_projections.url}/api/"
    myaccounts_api           = "https://myaccountsapi.demo2.bestinvest.co.uk/"
    ois_api                  = "https://oisapi.demo2.bestinvest.co.uk/"
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
