locals {
  environment = "dev1"
  apim_name   = "digital-hybrid"
  rg_name     = "digital-hybrid-backend"
  apima_name  = "digital-hybrid-api"
  location    = "West Europe"
  api_definitions = {
    for k, v in
    tomap(jsondecode(file(format("%s/%s", path.module, "dev_api_definitions.json"))))["DevAPIDefinitions"] :
    v["operation_id"] => v
  }
  bestinvest_backend_base_url = "https://online.bestinvest.co.uk/api/"
  endpoints                   = jsonencode(zipmap(values(azurerm_api_management_api_operation.api_operation).*.operation_id, formatlist("%s%s", format("%s/%s", data.terraform_remote_state.dev_apim.outputs.dev_apim_gateway_url, data.azurerm_api_management_api.pr_apia.path), values(azurerm_api_management_api_operation.api_operation).*.url_template)))
  if_static_website_enabled   = var.enable_static_website ? [{}] : []
  path                        = "digitalhybrid"
}
