output "url_template" {
  value = values(azurerm_api_management_api_operation.api_operation).*.url_template
}

output "staging_apim_gateway_url" {
  value = data.azurerm_api_management.staging_apim.gateway_url
}

output "staging_apia_path" {
  value = data.azurerm_api_management_api.staging_apia.path
}

output "endpoints" {
  value = local.endpoints
}
