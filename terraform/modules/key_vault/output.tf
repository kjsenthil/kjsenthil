output "id" {
  value       = azurerm_key_vault.key_vault.id
  description = "ID of the key vault."
}

output "uri" {
  value       = azurerm_key_vault.key_vault.vault_uri
  description = "url of the key vault."
} 