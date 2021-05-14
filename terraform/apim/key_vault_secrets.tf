resource "azurerm_key_vault_secret" "myaccount_signing_key" {
  name         = "myaccount-signing-key"
  value        = var.myaccount_signing_key
  key_vault_id = module.key_vault.id
}

resource "azurerm_key_vault_secret" "xplan_username" {
  name         = "xplan-username"
  value        = var.xplan_username
  key_vault_id = module.key_vault.id
}

resource "azurerm_key_vault_secret" "xplan_password" {
  name         = "xplan-password"
  value        = var.xplan_password
  key_vault_id = module.key_vault.id
}
