locals {
  environment = "dev1"
  location    = "West Europe"
  api_definitions = {
    for k, v in
    tomap(jsondecode(file(format("%s/%s", path.module, "dev_api_definitions.json"))))["DevAPIDefinitions"] :
    v["operation_id"] => v
  }
  endpoints          = jsonencode(zipmap(values(azurerm_api_management_api_operation.api_operation).*.operation_id, formatlist("%s%s", format("%s/%s", data.terraform_remote_state.dev_apim.outputs.dev_apim_gateway_url, data.azurerm_api_management_api.pr_apia.path), values(azurerm_api_management_api_operation.api_operation).*.url_template)))
  environment_prefix = var.environment_prefix
  apim_name          = data.terraform_remote_state.dev_apim.outputs.dev_apim_name
  path               = format("%sdigitalhybrid", local.environment_prefix)
  rg_name            = data.terraform_remote_state.dev_apim.outputs.dev_apim_rg
  apima_name         = format("%s-digital-hybrid-api", var.environment_prefix)
  default_tags = {
    "Cost Code"          = "cost_code_placeholder"
    "Department"         = "FS"
    "Project"            = "Digital-Hybrid"
    "Owner"              = "owner_placeholder"
    "terraform"          = "true"
    "environment"        = local.environment
    "environment_prefix" = local.environment_prefix
  }
}
