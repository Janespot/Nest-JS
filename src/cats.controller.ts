import { Controller, Get, Post, Put, Delete, Body, Query, Param } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntries } from './dto';

@Controller('cats')
export class CatsController {
	@Post()
		addCat(@Body() createCatDto: CreateCatDto): string {
		return 'This action adds a new Cat';
	}

	@Get()
	findAllCats(@Query() query: ListAllEntries): string {
		return `This action returns all Cats (limit ${query.limit} items)`;
	}

	@Get(':id')
	findOneCat(@Param('id') id: string): string {
		return `This action returns a #${id} Cat`;
	}

	@Put(':id')
	updateCat(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): string {
		return `This action updates a #${id} Cat`;
	}

	@Delete(':id')
	deleteCat(@Param('id') id: string): string {
		return `This action deletes a #${id} Cat`;
	}
}