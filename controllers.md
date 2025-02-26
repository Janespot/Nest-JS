### Controllers

`cats.controller.ts`
```
import { Controller, Get, Post, Param, Put, Delete } from '@nestjs/common';

@Controller('cats') 
// To use a subdomain, use @Controller({ host: 'admin.example.com' })
//to specify host of incoming request. Use default Express adapter for this.
export class CatsController {
	//get request
	@Get()
	@Redirect('https://localhost:3000', 301) //for redirection (optional)
	findAll(): string {
		return 'This action returns all cats';
	}

	//route parameters
	@Get(':id)
	findOne(@Param params: any): string {
		return `This returns a #${params.id} cat`;
	}
	
	//post request
	@Post()
	@HttpCode(204) //change http code from 201 which is the default (optional)
	@Header('Cache-Control', 'no-store')// add a http header (optional)
	addCat(): string {
		return 'This action adds a cat';
	}
	
	//put request
	@Put()
	modifyCat(): string {
		return 'This method updates cat';
	}

	//delete request
	@Delete()
	deleteCat(): string {
		return 'This method deletse a cat';
	}
}
```

___
#### Request Payloads

Create a **DTO (Data Transfer Object)** - Specifies how data should be sent over a network **(POST method)**

`create-cat.dto.ts`

```
export class CreateCatDto {
	name: string,
	age: number,
	breed: string
}
```
In `cats.controller.ts`:

```
@Post()
async addCat(@Body() createCatDto: CreateCatDto) {
	retutn 'This action adds a new cat';
}
```

___
#### Query Parameters

To filter a list of cats based on **age** and **breed**, where age and breed are from query string, e.g. `
**`GET /cats?age=2&breed=Persian`**:

In `cats.controller.ts`:

```
@Get()
async findAll(@Query('age') age: number, @Query('breed') breed: string) {
	return `This action returns all cats filtered by age: ${age} and breed ${breed}`
}
```

___
### Full Controller Code

`cats.controller.ts`

```
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
```

___
#### Getting Up and Running

Import `CatsController` in a module to get started.

`app.module.ts`

```
import { Module } from '@nestjs/common';
import{ CatsController } from './cats/cats.controller.ts';

@Module({
controllers: [CatsController],
})

export class AppModule{}
```

___
#### Library-Specific Approach

The above code used Standard NestJs method. To use library-specific approach, `cats.controller.ts` can be re-written as:

```
import { Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
	@Post()
	addCat(@Res() res: Response) {
			rs.status(HttpStatus.CREATED).send()
	}

	@Get()
	findAll(@Res res: Response) {
		res.status(HttpStatus.OK).json([])
	}
```

While using this approach. to avoid incompatibility issues with NestJs features, use passthrough as shown below:

```
@Get()
@findAll(@Res({passthrough: true}) res: Response) {
		re.status(HttpStatus.OK);
		return [];
}
```