locals {
  environment = "prod"
  apim_name   = "digital-hybrid"
  rg_name     = "digital-hybrid-backend"
  location    = "West Europe"
  apima_name  = "digital-hybrid-api"
  api_definitions = {
    for k, v in
    tomap(jsondecode(file(format("%s/%s", path.module, "prod_api_definitions.json"))))["ProdAPIDefinitions"] :
    v["operation_id"] => v
  }
  bestinvest_backend_base_url = "https://online.bestinvest.co.uk/api/"
  endpoints                   = jsonencode(zipmap(values(azurerm_api_management_api_operation.api_operation).*.operation_id, formatlist("%s%s", format("%s/%s", data.azurerm_api_management.prod_apim.gateway_url, data.azurerm_api_management_api.prod_apia.path), values(azurerm_api_management_api_operation.api_operation).*.url_template)))
  if_static_website_enabled   = var.enable_static_website ? [{}] : []
  if_storybook_enabled        = var.enable_storybook ? [{}] : []
  path                        = "digitalhybrid"
  default_tags = {
    "Cost Code"   = "cost_code_placeholder"
    "Department"  = "FS"
    "Project"     = "Digital-Hybrid"
    "Owner"       = "owner_placeholder"
    "terraform"   = "true"
    "environment" = local.environment
  }
}