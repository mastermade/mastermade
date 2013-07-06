<!DOCTYPE html>

<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	
	<title><?php echo $title; ?></title>
	
	<?php echo $theme->header(); ?>
	
</head>
<body class="<?php echo Utils::slugify($page_title); ?>">