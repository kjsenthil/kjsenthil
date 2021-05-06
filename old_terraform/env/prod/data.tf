data "azurerm_api_management_api" "prod_apia" {
  name                = format("%s-%s", local.environment, local.apima_name)
  api_management_name = format("%s-%s-mgmt", local.environment, local.apim_name)
  resource_group_name = format("%s-%s-rg", local.environment, local.rg_name)
  revision            = "1"
}

data "azurerm_api_management" "prod_apim" {
  name                = format("%s-%s-mgmt", local.environment, local.apim_name)
  resource_group_name = format("%s-%s-rg", local.environment, local.rg_name)
}