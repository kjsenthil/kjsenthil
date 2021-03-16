function Push-FileToAzureStorageContainer {
    [cmdletbinding()]
    param(
      $StorageAccountName,
      $ContainerName,
      $StorageAccountRG,
      $sourceFileRootDirectory,
      $TargetDirectory = "",
      $Force
    )

    $storageAccount = Get-AzStorageAccount -ResourceGroupName $StorageAccountRG -AccountName $StorageAccountName
    $ctx = $storageAccount.Context
    $container = Get-AzStorageContainer -Name $ContainerName -Context $ctx

    $container.CloudBlobContainer.Uri.AbsoluteUri
    if ($container) {
      $filesToUpload = Get-ChildItem $sourceFileRootDirectory -Recurse -File

      foreach ($x in $filesToUpload) {
        $targetPath = $TargetDirectory + ($x.fullname.Substring($sourceFileRootDirectory.Length + 1)).Replace("\", "/")

        Write-Verbose "Uploading $("\" + $x.fullname.Substring($sourceFileRootDirectory.Length + 1)) to $($container.CloudBlobContainer.Uri.AbsoluteUri + "/" + $targetPath)"
        Set-AzStorageBlobContent -File $x.fullname -Container $container.Name -Blob $targetPath -Context $ctx -Properties @{"ContentType" = "text/html"} -Force:$Force | Out-Null
      }
    }
    $DestinationURL = $container.CloudBlobContainer.Uri.AbsoluteUri + "/" + $TargetDirectory
    Write-Host "[Finish] Artifacts uploaded to $DestinationURL "
}
function New-AzureStorageContainer {
    [cmdletbinding()]
    param(
        $StorageAccountName,
        $StorageAccountRG,
        $ContainerName
    )
    $StorageAccount = Get-AzStorageAccount -ResourceGroupName $StorageAccountRG -AccountName $StorageAccountName
    $Context  = $StorageAccount.Context
    if($null -eq $(Get-AzStorageContainer -Name $ContainerName -Context $Context -ErrorAction Ignore)) {
      Write-Host "Storage container doesnt exists, creating container named $ContainerName"
      New-AzStorageContainer -Context $Context -Name $ContainerName
    } else {
    Write-Host "Storage container exists"
    }
}

function Remove-AzureStorageBlobs {
    [cmdletbinding()]
    param(
        $StorageAccountName,
        $StorageAccountRG,
        $ContainerName
    )
    $StorageAccount = Get-AzStorageAccount -ResourceGroupName $StorageAccountRG -AccountName $StorageAccountName
    $Context  = $StorageAccount.Context
    if($null -eq $(Get-AzStorageContainer -Name $ContainerName -Context $Context -ErrorAction Ignore)) {
        Write-Host "[Error] Storage container doesnt exists"
    } else {
        Write-Host "Storage container exists, deleting all Files in container $ContainerName"
        (Get-AzStorageBlob -Container $ContainerName -Context $Context | Remove-AzStorageBlob -Force) 1> $null
    }
}

function Copy-FilesToAzureStorageContainer {
    [cmdletbinding()]
    param(
        $SrcStorageAccountName,
        $SrcStorageAccountRG,
        $SrcContainerName,
        $DstStorageAccountName,
        $DstStorageAccountRG,
        $DstContainerName,
        $SrcFolderName = "",
        $Force
    )
    $SrcStorageAccount = Get-AzStorageAccount -ResourceGroupName $SrcStorageAccountRG -AccountName $SrcStorageAccountName
    $SrcContext  = $SrcStorageAccount.Context

    $DstStorageAccount = Get-AzStorageAccount -ResourceGroupName $DstStorageAccountRG -AccountName $DstStorageAccountName
    $DstContext  = $DstStorageAccount.Context

    $blobs = Get-AzStorageBlob -Context $SrcContext -Container $SrcContainerName -Prefix $SrcFolderName
    $destBlob = $blobs | Start-AzStorageBlobCopy -Context $SrcContext -DestContext $DstContext -DestContainer $DstContainerName -Force:$Force
    $destBlob | Get-AzStorageBlobCopyState -WaitForComplete
}