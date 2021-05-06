output "url" {
  description = "URL of the deployed function app"
  value       = azurerm_function_app.this.default_hostname
}
