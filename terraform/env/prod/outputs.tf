output "url_template" {
  value = values(azurerm_api_management_api_operation.api_operation).*.url_template
}

output "prod_apim_gateway_url" {
  value = data.azurerm_api_management.prod_apim.gateway_url
}

output "prod_apia_path" {
  value = data.azurerm_api_management_api.prod_apia.path
}

output "endpoints" {
  value = local.endpoints
}