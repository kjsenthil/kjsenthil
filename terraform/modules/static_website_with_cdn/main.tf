resource "azurerm_storage_account" "this" {
  name                      = var.storage_account_name
  resource_group_name       = var.resource_group_name
  location                  = var.location
  account_kind              = var.account_kind
  account_tier              = var.account_tier
  account_replication_type  = var.account_replication_type
  enable_https_traffic_only = var.enable_https_traffic_only
  tags                      = merge(map("tf_module_path", "./terraform/modules/static_website_storage_account"), var.tags)

  static_website {
    index_document     = var.index_path
    error_404_document = var.error_path
  }

  blob_properties {
    cors_rule {
      allowed_methods    = ["GET", "HEAD", "POST", "OPTIONS", "PUT"]
      allowed_origins    = ["*"]
      allowed_headers    = ["*"]
      exposed_headers    = ["*"]
      max_age_in_seconds = 60 * 60 * 24 * 2
    }
  }

  identity {
    type = "SystemAssigned"
  }
}

resource "azurerm_storage_account_network_rules" "this" {
  resource_group_name  = var.resource_group_name
  storage_account_name = azurerm_storage_account.this.name
  default_action       = "Deny"
  // Allows Azure CDN IPs
  ip_rules = ["147.243.0.0/16"]
}

module "cdn" {
  source = "../../modules/cdn_endpoint"

  name                = azurerm_storage_account.this.name
  resource_group_name = data.azurerm_cdn_profile.cdn_profile.resource_group_name
  cdn_profile_name    = data.azurerm_cdn_profile.cdn_profile.name

  origin_name     = azurerm_storage_account.this.name
  origin_hostname = azurerm_storage_account.this.primary_web_host

  csp_allowed_script_sources = var.csp_allowed_script_sources
  csp_allowed_style_sources  = var.csp_allowed_style_sources

  tags = merge(map("tf_module_path", "./terraform/modules/static_website_storage_account"), var.tags)
}

resource "azurerm_dns_cname_record" "cdn" {
  count               = var.public_dns_cname == "" ? 0 : 1
  name                = var.public_dns_cname
  zone_name           = var.public_dns_zone_name
  resource_group_name = var.dns_resource_group_name == "" ? var.resource_group_name : var.dns_resource_group_name
  ttl                 = 3600
  target_resource_id  = module.cdn.cdn_id
  tags                = merge(map("tf_module_path", "./terraform/modules/static_website_storage_account"), var.tags)
}