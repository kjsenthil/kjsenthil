resource "azurerm_key_vault_secret" "myaccount_signing_key" {
  name         = "myaccount-signing-key"
  value        = var.myaccount_signing_key
  key_vault_id = module.key_vault.id
}