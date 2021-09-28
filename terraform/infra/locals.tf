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

  myaccount_endpoints_requiring_guest_auth = {
    for k, v in
    tomap(jsondecode(file("${path.module}/myaccounts_apis_with_guest_login.json")))["api_definitions"] :
    v["operation_id"] => v
  }

  apim_base_url = "${data.azurerm_api_management.apim.gateway_url}/${module.apima.path}"

  api_backends = {
    projections_function_app = "https://${module.function_app_projections.url}/api/"
    features_function_app    = var.environment_prefix == "staging" || var.environment_prefix == "prod" ? "https://${module.function_app_features[0].url}/api/" : null
    returns_function_app     = "https://${module.function_app_returns.url}/api/"
  }

  default_tags = {
    "CostCode"            = "934"
    "Department"          = "Financial Services"
    "Project"             = "Digital Hybrid"
    "Owner"               = "owner_placeholder"
    "terraform"           = "true"
    "main_directory_path" = "./terraform/infra"
    "env_prefix"          = var.environment_prefix
    "BranchName"          = var.environment_prefix == "staging" || var.environment_prefix == "prod" ? "master" : var.git_branch_name
  }
}
