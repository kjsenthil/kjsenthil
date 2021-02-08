$StorageAccountName = "dighybprghi3bas"
$sourceFileRootDirectory = "<insert_file_location>"
$ContainerName = "$web"
$StorageAccountRG = "digital-hybrid-resources"

#Upload files to Azure Storage account
function Upload-FileToAzureStorageContainer {
    [cmdletbinding()]
    param(
        $StorageAccountName,
        $ContainerName,
        $StorageAccountRG,
        $sourceFileRootDirectory,
        $Force
    )

    $storageAccount = Get-AzStorageAccount -ResourceGroupName $StorageAccountRG -AccountName $StorageAccountName
    $ctx = $storageAccount.Context
    $container = Get-AzStorageContainer -Name $ContainerName -Context $ctx

    $container.CloudBlobContainer.Uri.AbsoluteUri
    if ($container) {
        $filesToUpload = Get-ChildItem $sourceFileRootDirectory -Recurse -File

        foreach ($x in $filesToUpload) {
            $targetPath = ($x.fullname.Substring($sourceFileRootDirectory.Length + 1)).Replace("\", "/")

            Write-Verbose "Uploading $("\" + $x.fullname.Substring($sourceFileRootDirectory.Length + 1)) to $($container.CloudBlobContainer.Uri.AbsoluteUri + "/" + $targetPath)"
            Set-AzStorageBlobContent -File $x.fullname -Container $container.Name -Blob $targetPath -Context $ctx -Properties @{"ContentType" = "text/html"} -Force:$Force | Out-Null
        }
    }
}

#Upload-FileToAzureStorageContainer -StorageAccountName $StorageAccountName -ContainerName $ContainerName -StorageAccountRG $StorageAccountRG -sourceFileRootDirectory $sourceFileRootDirectory -Verbose