resource "azurerm_resource_group" "prod_resource_group" {
  name     = format("%s-%s-rg", local.environment, local.rg_name)
  location = local.location
  tags     = local.default_tags
}

resource "azurerm_api_management" "apim" {
  name                = format("%s-%s-mgmt", local.environment, local.apim_name)
  resource_group_name = azurerm_resource_group.prod_resource_group.name
  location            = local.location
  publisher_name      = "digitalhybrid"
  publisher_email     = "digitalhybrid@credera.co.uk"
  sku_name            = "Developer_1"
  tags                = local.default_tags
  lifecycle {
    prevent_destroy = true
  }
}

resource "azurerm_api_management_api" "api" {
  name                  = format("%s-digital-hybrid-api", local.environment)
  resource_group_name   = azurerm_resource_group.prod_resource_group.name
  api_management_name   = azurerm_api_management.apim.name
  revision              = 1
  display_name          = format("%s-digital-hybrid-API", local.environment)
  path                  = local.path
  protocols             = ["https"]
  subscription_required = false
  description           = format("%s digital hybrid api", local.environment)
}

# The API operation deployed in Production.
resource "azurerm_api_management_api_operation" "api_operation" {
  for_each            = local.api_definitions
  operation_id        = lookup(each.value, "operation_id", null)
  api_name            = azurerm_api_management_api.api.name
  api_management_name = azurerm_api_management.apim.name
  resource_group_name = azurerm_resource_group.prod_resource_group.name
  display_name        = lookup(each.value, "display_name", null)
  method              = lookup(each.value.policy.cors, "method", null)
  url_template        = lookup(each.value, "url_template", null)
  description         = lookup(each.value, "description", null)

  response {
    status_code = 200
  }

  dynamic "template_parameter" {
    for_each = length(lookup(each.value, "path_params", [])) > 0 ? toset(lookup(each.value, "path_params", [])) : []
    content {
      name     = template_parameter.key
      required = true
      type     = "string"
    }
  }
}

# The API operation policy For the API. Deployed in Production.
resource "azurerm_api_management_api_operation_policy" "api_operation_policy" {
  for_each            = local.api_definitions
  api_name            = azurerm_api_management_api.api.name
  api_management_name = azurerm_api_management.apim.name
  resource_group_name = azurerm_resource_group.prod_resource_group.name
  operation_id        = lookup(each.value, "operation_id", null)
  xml_content         = templatefile(abspath(format("%s/../../modules/policy_documents/api_operation_policy.xml", path.module)), { config = { backend_url = lookup(each.value.policy, "backend_url", null), cors_allowed_method = lookup(each.value.policy.cors, "method", null), cors_allowed_headers = lookup(each.value.policy.cors, "headers", null), cors_exposed_headers = lookup(each.value.policy.cors, "expose_headers", null), cors_allowed_origins = coalescelist(lookup(each.value.policy.cors, "allowed_origins", []), [azurerm_storage_account.front_end_storage_account.primary_web_endpoint]), allow-credentials = lookup(each.value.policy.cors, "allow-credentials", false), headers = lookup(each.value.policy, "set_header", null), outbound_headers = lookup(each.value.policy, "outbound_headers", null) } })
  depends_on          = [azurerm_api_management_api_operation.api_operation]
}

# Storage account for front-end
resource "azurerm_storage_account" "front_end_storage_account" {
  name                      = format("%s%s", "dighybpr", local.environment)
  resource_group_name       = azurerm_resource_group.prod_resource_group.name
  location                  = local.location
  account_kind              = "StorageV2"
  account_tier              = "Standard"
  account_replication_type  = "GRS"
  enable_https_traffic_only = true
  tags                      = local.default_tags

  dynamic "static_website" {
    for_each = local.if_static_website_enabled
    content {
      index_document     = "index.html"
      error_404_document = "error.html"
    }
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

# Storage account for storybook
resource "azurerm_storage_account" "storybook_storage_account" {
  name                      = format("%s%s", "dighybsb", local.environment)
  resource_group_name       = azurerm_resource_group.prod_resource_group.name
  location                  = local.location
  account_kind              = "StorageV2"
  account_tier              = "Standard"
  account_replication_type  = "GRS"
  enable_https_traffic_only = true
  tags                      = local.default_tags

  dynamic "static_website" {
    for_each = local.if_storybook_enabled
    content {
      index_document = "index.html"
    }
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

# The API operation to get Endpoints
resource "azurerm_api_management_api_operation" "endpoints_api_operation" {
  operation_id        = "get-endpoints"
  api_name            = azurerm_api_management_api.api.name
  api_management_name = azurerm_api_management.apim.name
  resource_group_name = azurerm_resource_group.prod_resource_group.name
  display_name        = "get-endpoints"
  method              = "GET"
  url_template        = "/endpoints"
  description         = "Returns a JSON object with all the API endpoints."

  response {
    status_code = 200
    representation {
      content_type = "application/json"
      sample       = local.endpoints
    }
  }
  depends_on = [azurerm_api_management_api_operation.api_operation]
}


# The API operation policy For the endpoints API.
resource "azurerm_api_management_api_operation_policy" "endpoints_api_operation_policy" {
  api_name            = azurerm_api_management_api.api.name
  api_management_name = azurerm_api_management.apim.name
  resource_group_name = azurerm_resource_group.prod_resource_group.name
  operation_id        = "get-endpoints"
  xml_content         = <<XML
                          <policies>
                            <inbound>
                              <mock-response status-code="200" content-type="application/json"/>
                            </inbound>
                          </policies>
                          XML
  depends_on          = [azurerm_api_management_api_operation.endpoints_api_operation]
}

resource "azurerm_application_insights" "app-insights" {
  name                = format("%s-%s", local.environment, local.apim_name)
  location            = local.location
  resource_group_name = azurerm_resource_group.prod_resource_group.name
  application_type    = "other"
  tags                = local.default_tags
}

resource "azurerm_api_management_logger" "apim_logger" {
  name                = format("%s-%s-apim-logger", local.environment, local.apim_name)
  api_management_name = azurerm_api_management.apim.name
  resource_group_name = azurerm_resource_group.prod_resource_group.name

  application_insights {
    instrumentation_key = azurerm_application_insights.app-insights.instrumentation_key
  }
}