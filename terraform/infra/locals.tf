locals {
  location_map = {
    uksouth = "uks"
    ukwest  = "ukw"
  }
  short_location = lookup(local.location_map, lower(replace(var.location, "/\\s/", "")))


  operation_endpoints       = { for api in module.api_operation : upper(replace(api.operation_id, "-", "_")) => api.url_template }
  xplan_operation_endpoints = { for api in module.api_operation_xplan : upper(replace(api.operation_id, "-", "_")) => api.url_template }

  api_endpoints = merge(local.operation_endpoints, local.xplan_operation_endpoints)


  api_definitions = {
    for k, v in
    tomap(jsondecode(file("${path.module}/api_definitions.json")))["api_definitions"] :
    v["operation_id"] => v
  }

  xplan_api_definitions = {
    for k, v in
    tomap(jsondecode(file("${path.module}/xplan_api_definitions.json")))["api_definitions"] :
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
    "CostCode"            = "934"
    "Department"          = "Financial Services"
    "Project"             = "Digital Hybrid"
    "Owner"               = "owner_placeholder"
    "terraform"           = "true"
    "main_directory_path" = "./terraform/infra"
    "env_prefix"          = var.environment_prefix
  }
}
